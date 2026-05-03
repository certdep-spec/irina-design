import { useState, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { portfolioCases, type PortfolioCase } from '../data/portfolio'

function Portfolio() {
  const location = useLocation()
  const navigate = useNavigate()

  const getFilterFromURL = useCallback((): 'all' | 'interior' | 'furniture' => {
    const params = new URLSearchParams(location.search)
    const filterParam = params.get('filter')
    if (filterParam === 'interior' || filterParam === 'furniture') {
      return filterParam
    }
    return 'all'
  }, [location.search])

  const [heroRef, heroVisible] = useScrollReveal()
  const [introRef, introVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()
  const [selectedItem, setSelectedItem] = useState<PortfolioCase | null>(null)

  const activeFilter = getFilterFromURL()

  const handleFilterChange = (filter: 'all' | 'interior' | 'furniture') => {
    const params = new URLSearchParams(location.search)
    if (filter === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', filter)
    }
    navigate({ search: params.toString() }, { replace: true })
  }

  const filteredCases = portfolioCases.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`bg-white py-24 px-6 border-b border-stone-200 ${heroVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-8 text-stone-800">
            Інтер’єрні та меблеві рішення
          </h1>
          {/* Студійний акцент з підкресленням замість фону */}
          <p className="inline-block text-xl md:text-2xl text-stone-500 font-light pb-2 border-b-2 border-stone-300">
            Комплексні проєкти: від планування простору до індивідуального дизайну меблів
          </p>
        </div>
      </section>

      {/* Intro Text & Filters */}
      <section ref={introRef} className={`pt-16 pb-12 px-6 ${introVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-stone-600 leading-relaxed mb-12">
            Кожен проєкт — це індивідуальне рішення, адаптоване під стиль життя клієнта,
            особливості простору та бюджет. Тут ви можете побачити приклади реалізованих ідей.
          </p>
          
          {/* Filters */}
           <div className="flex flex-wrap justify-center gap-4">
             <button
               onClick={() => handleFilterChange('all')}
               className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === 'all' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}
             >
               Всі проєкти
             </button>
             <button
               onClick={() => handleFilterChange('interior')}
               className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === 'interior' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}
             >
               Інтер'єр
             </button>
             <button
               onClick={() => handleFilterChange('furniture')}
               className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === 'furniture' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}
             >
               Меблі
             </button>
           </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section 
        ref={gridRef}
        className={`pb-24 px-6 ${gridVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Grid Container with animations on mount */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group relative cursor-pointer flex flex-col h-full border border-stone-100"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Wrapper */}
                <div className="relative w-full h-[280px] overflow-hidden">
                   <img
                     src={item.coverImage}
                     alt={item.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px]">
                    <span className="text-white font-medium px-6 py-3 border-2 border-white/80 rounded tracking-wide bg-black/20 hover:bg-white hover:text-stone-900 transition-colors">
                      Детальніше
                    </span>
                  </div>
                  
                  {/* Category Badge on image */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase text-stone-700 rounded-sm shadow-sm z-10">
                    {item.category === 'interior' ? 'Інтер’єр' : 'Меблі'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-stone-800 group-hover:text-stone-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-400 mb-5 tracking-widest uppercase font-medium">
                    {item.meta}
                  </p>
                  
                  <div className="text-stone-600 text-sm leading-relaxed flex-grow">
                    {item.task && item.solution ? (
                      <div className="space-y-3">
                        <p><span className="font-semibold text-stone-800">Завдання:</span> {item.task}</p>
                        <p><span className="font-semibold text-stone-800">Рішення:</span> {item.solution}</p>
                      </div>
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">Проєктів у цій категорії поки немає.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal / Gallery */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 transition-colors z-20 bg-stone-100 hover:bg-stone-200 rounded-full p-2"
              aria-label="Закрити"
            >
              <FiX size={24} />
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-14">
              <div className="mb-12 max-w-3xl">
                <div className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-wider uppercase mb-4 rounded-sm">
                  {selectedItem.category === 'interior' ? 'Інтер’єрний проєкт' : 'Дизайн меблів'}
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-4 text-stone-800 leading-tight">
                  {selectedItem.title}
                </h2>
                <p className="text-sm text-stone-400 mb-8 tracking-widest uppercase font-medium">
                  {selectedItem.meta}
                </p>
                
                <div className="text-stone-700 leading-relaxed text-lg bg-stone-50 p-8 rounded-xl border border-stone-100">
                  {selectedItem.task && selectedItem.solution ? (
                    <div className="space-y-6">
                      <div>
                        <strong className="block text-stone-900 mb-2 font-serif text-xl">Завдання</strong> 
                        <p>{selectedItem.task}</p>
                      </div>
                      <div>
                        <strong className="block text-stone-900 mb-2 font-serif text-xl">Рішення</strong> 
                        <p>{selectedItem.solution}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg">{selectedItem.description}</p>
                  )}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedItem.gallery.map((img, index) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden bg-stone-200 rounded-xl">
                    <img
                      src={img}
                      alt={`${selectedItem.title} - фото ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {selectedItem.gallery.length === 1 && (
                <div className="mt-8 text-center p-8 bg-stone-50 border border-stone-200 rounded-xl border-dashed">
                  <p className="text-stone-500 font-medium">
                    Тут будуть додаткові фотографії цього проєкту.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio