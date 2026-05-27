import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlus, FiTrash2, FiSave, FiArrowLeft, FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface PortfolioCase {
  id: string;
  title: string;
  category: 'interior' | 'furniture';
  meta: string;
  task?: string;
  solution?: string;
  description?: string;
  coverImage: string;
  gallery: string[];
}

export default function Admin() {
  const [cases, setCases] = useState<PortfolioCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCases(data);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      setMessage('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  };

  const savePortfolio = async (updatedCases: PortfolioCase[]) => {
    setSaving(true);
    try {
      const response = await fetch('http://127.0.0.1:5174/dev-api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCases),
      });
      if (response.ok) {
        setMessage('Збережено успішно');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to save portfolio:', error);
      setMessage('Помилка збереження');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = (caseId: string, imageUrl: string) => {
    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        // If we deleted the image that was the cover, reset the cover
        const wasCover = c.coverImage === imageUrl;
        return { 
          ...c, 
          gallery: c.gallery.filter(img => img !== imageUrl),
          coverImage: wasCover ? (c.gallery.find(img => img !== imageUrl) || '') : c.coverImage
        };
      }
      return c;
    });
    setCases(updatedCases);
    savePortfolio(updatedCases); // auto-save after delete
  };

  const handleSetCoverImage = (caseId: string, imageUrl: string) => {
    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return { ...c, coverImage: imageUrl };
      }
      return c;
    });
    setCases(updatedCases);
    savePortfolio(updatedCases);
  };

  const handleUploadCover = async (caseId: string, file: File) => {
    const caseItem = cases.find(c => c.id === caseId);
    if (!caseItem) return;

    const subfolder = caseItem.gallery[0]?.split('/')[2] || (caseItem.category === 'interior' ? 'living' : 'kitchen');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadUrl = `http://127.0.0.1:5174/dev-api/photo-upload?filename=${encodeURIComponent(file.name)}&subfolder=${subfolder}`;
      console.log('Attempting cover upload to:', uploadUrl);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Cover upload success:', result);
        const newImageUrl = result.url;
        const updatedCases = cases.map(c => {
          if (c.id === caseId) {
            return { ...c, coverImage: newImageUrl };
          }
          return c;
        });
        setCases(updatedCases);
        await savePortfolio(updatedCases);
      } else {
        const errorText = await response.text();
        setMessage('Помилка завантаження обкладинки: ' + response.status);
      }
    } catch (error) {
      console.error('Cover upload error:', error);
      setMessage('Помилка завантаження файлу обкладинки');
    }
  };

  const handleUploadImage = async (caseId: string, file: File) => {
    const caseItem = cases.find(c => c.id === caseId);
    if (!caseItem) return;
    
    const subfolder = caseItem.gallery[0]?.split('/')[2] || (caseItem.category === 'interior' ? 'living' : 'kitchen');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadUrl = `http://127.0.0.1:5174/dev-api/photo-upload?filename=${encodeURIComponent(file.name)}&subfolder=${subfolder}`;
      console.log('Attempting upload with FormData to:', uploadUrl);
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Upload success:', result);
        const newImageUrl = result.url;
        const updatedCases = cases.map(c => {
          if (c.id === caseId) {
            // If there's no cover image currently set, set this new image as the cover automatically
            const hasCover = !!c.coverImage;
            return { 
              ...c, 
              gallery: [...c.gallery, newImageUrl],
              coverImage: hasCover ? c.coverImage : newImageUrl
            };
          }
          return c;
        });
        setCases(updatedCases);
        await savePortfolio(updatedCases);
      } else {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status, errorText);
        setMessage('Помилка завантаження: ' + response.status);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Помилка завантаження файлу');
    }
  };

  if (loading) return <div className="p-20 text-center">Завантаження...</div>;

  return (
    <div className="bg-stone-50 min-h-screen p-8">
      <Helmet>
        <title>Панель керування — Портфоліо</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Link to="/" className="flex items-center text-stone-500 hover:text-stone-800 mb-2">
              <FiArrowLeft className="mr-2" /> На головну
            </Link>
            <h1 className="text-4xl font-serif font-bold text-stone-800">Керування портфоліо</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {message && <span className="text-stone-600 animate-fade-in">{message}</span>}
            <button 
              onClick={() => savePortfolio(cases)}
              disabled={saving}
              className="btn-primary flex items-center"
            >
              <FiSave className="mr-2" /> {saving ? 'Збереження...' : 'Зберегти всі зміни'}
            </button>
          </div>
        </div>

        <div className="space-y-12">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 bg-stone-100 border-b border-stone-200 flex justify-between items-center">
                <h2 className="text-xl font-serif font-semibold text-stone-800">
                  {caseItem.title} <span className="text-stone-400 font-sans text-sm ml-2">({caseItem.category})</span>
                </h2>
                <div className="relative">
                  <input 
                    type="file" 
                    id={`file-${caseItem.id}`}
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleUploadImage(caseItem.id, e.target.files[0])}
                  />
                  <label 
                    htmlFor={`file-${caseItem.id}`}
                    className="flex items-center px-4 py-2 bg-stone-800 text-white rounded-lg text-sm cursor-pointer hover:bg-stone-700 transition-colors"
                  >
                    <FiUpload className="mr-2" /> Додати фото в галерею
                  </label>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Левая колонка: Обложка */}
                <div className="lg:border-r lg:border-stone-200 lg:pr-8 flex flex-col items-center justify-start">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 w-full text-center lg:text-left">
                    Обкладинка проєкту
                  </h3>
                  
                  <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 mb-4 shadow-sm group">
                    <img 
                      src={caseItem.coverImage} 
                      alt="Обкладинка" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Поточна обкладинка</span>
                    </div>
                  </div>

                  <div className="relative w-full">
                    <input 
                      type="file" 
                      id={`cover-${caseItem.id}`}
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleUploadCover(caseItem.id, e.target.files[0])}
                    />
                    <label 
                      htmlFor={`cover-${caseItem.id}`}
                      className="flex items-center justify-center w-full px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg text-sm cursor-pointer hover:bg-stone-50 transition-colors font-medium"
                    >
                      <FiUpload className="mr-2" /> Змінити обкладинку
                    </label>
                  </div>
                </div>

                {/* Правая колонка: Галерея */}
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                    Галерея зображень ({caseItem.gallery.length})
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {caseItem.gallery.map((img, idx) => {
                      const isCurrentCover = caseItem.coverImage === img;
                      return (
                        <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden border border-stone-100 bg-stone-50 shadow-sm">
                          <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          
                          {/* Индикация текущей обложки */}
                          {isCurrentCover ? (
                            <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow z-20">
                              Обкладинка
                            </div>
                          ) : null}

                          {/* Действия при наведении */}
                          <div className="absolute inset-0 bg-stone-900/80 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 z-10">
                            {/* Удалить изображение */}
                            <button 
                              onClick={() => handleDeleteImage(caseItem.id, img)}
                              className="text-white hover:text-red-400 flex items-center justify-center p-1 bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 transition-colors"
                              title="Видалити зображення"
                            >
                              <FiTrash2 size={20} />
                            </button>
                            
                            {/* Сделать обложкой */}
                            {!isCurrentCover && (
                              <button 
                                onClick={() => handleSetCoverImage(caseItem.id, img)}
                                className="bg-white/95 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded hover:bg-stone-100 transition-colors shadow-md w-full max-w-[120px] text-center"
                              >
                                Обкладинка
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {caseItem.gallery.length === 0 && (
                      <div className="col-span-full py-12 text-center text-stone-400 border-2 border-dashed border-stone-200 rounded-xl">
                        Немає зображень у цій секції
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
