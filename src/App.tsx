import { useState, useEffect, useMemo } from 'react';
import { ZONES_DATA, BANK_POINTS } from './data/antioquianData';
import { Product, CartItem, CategoryFilterType } from './types/catalog';
import { normalizeText } from './utils/formatters';

// Components
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { MobileDrawer } from './components/layout/MobileDrawer';

import { SearchBar } from './components/ui/SearchBar';
import { BackToTop } from './components/ui/BackToTop';

import { ZoneSection } from './components/catalog/ZoneSection';
import { BanksSection } from './components/banks/BanksSection';

import { CartFloatingBar } from './components/calculator/CartFloatingBar';
import { CartDrawer } from './components/calculator/CartDrawer';
import { SummaryModal } from './components/calculator/SummaryModal';

export default function App() {
  // --- Cart State & Persistence ---
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('antioquianidad_fichos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('antioquianidad_fichos_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage write errors
    }
  }, [cartItems]);

  // --- Filtering & Navigation State ---
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('todos');
  const [selectedMunicipioId, setSelectedMunicipioId] = useState<string>('todos');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryFilterType>('todos');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  // --- UI Drawer & Modal State ---
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // --- Cart Handlers ---
  const handleAddToCart = (product: Product, municipioName: string, categoryName: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [...prev, { product, municipioName, categoryName, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getCartQuantity = (productId: string): number => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCartCOP = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const totalCartItemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // --- Category Quick Chip Filter Matching Helper ---
  const matchesCategoryFilter = (catName: string, prodName: string, catFilter: CategoryFilterType): boolean => {
    if (catFilter === 'todos') return true;
    if (catFilter === 'bancos') return false; // Handled separately in UI

    const normCat = normalizeText(catName);
    const normProd = normalizeText(prodName);

    switch (catFilter) {
      case 'postres':
        return normCat.includes('postre') || normProd.includes('postre') || normProd.includes('leche') || normProd.includes('arroz con leche');
      case 'bebidas':
        return (
          normCat.includes('bebida') ||
          normCat.includes('fria') ||
          normCat.includes('caliente') ||
          normProd.includes('agua') ||
          normProd.includes('avena') ||
          normProd.includes('granizado') ||
          normProd.includes('tinto') ||
          normProd.includes('aromatica') ||
          normProd.includes('cafe') ||
          normProd.includes('cola') ||
          normProd.includes('soda')
        );
      case 'comidas':
        return (
          normCat.includes('comida') ||
          normCat.includes('plato') ||
          normCat.includes('cazuela') ||
          normCat.includes('sancocho') ||
          normProd.includes('frijoles') ||
          normProd.includes('fiambre') ||
          normProd.includes('tamal') ||
          normProd.includes('perro') ||
          normProd.includes('hamburguesa') ||
          normProd.includes('patacon') ||
          normProd.includes('arepa') ||
          normProd.includes('pincho') ||
          normProd.includes('salchipapa')
        );
      case 'dulces':
        return normCat.includes('dulce') || normCat.includes('confiteria') || normProd.includes('chocolatina') || normProd.includes('gomita') || normProd.includes('trululu') || normProd.includes('bombon') || normProd.includes('barrilete');
      case 'panaderia':
        return normCat.includes('panaderia') || normCat.includes('mecan') || normProd.includes('pastel') || normProd.includes('buñuelo') || normProd.includes('churro') || normProd.includes('crispeta') || normProd.includes('palito') || normProd.includes('hojaldre');
      case 'atripciones':
        return normCat.includes('atrap') || normCat.includes('recreacion') || normProd.includes('inflable') || normProd.includes('pintacarita') || normProd.includes('pintura') || normProd.includes('soda');
      default:
        return true;
    }
  };

  // --- Filtering & Sorting Pipeline ---
  const filteredZones = useMemo(() => {
    if (selectedZoneId === 'bancos' || activeCategoryFilter === 'bancos') {
      return [];
    }

    const normQuery = normalizeText(searchQuery);

    return ZONES_DATA.map((zone) => {
      // Zone filter
      if (selectedZoneId !== 'todos' && zone.id !== selectedZoneId) {
        return null;
      }

      // Municipios in zone
      const filteredMunicipios = zone.municipios.map((municipio) => {
        // Municipio filter
        if (selectedMunicipioId !== 'todos' && municipio.id !== selectedMunicipioId) {
          return null;
        }

        const matchMunicipioName = normalizeText(municipio.name).includes(normQuery);
        const matchGrades = normalizeText(municipio.responsibleGrades).includes(normQuery);
        const matchLocation = normalizeText(municipio.location).includes(normQuery);
        const matchZone = normalizeText(zone.name).includes(normQuery);

        // Filter categories inside municipio
        const filteredCategories = municipio.categories.map((category) => {
          const matchCatName = normalizeText(category.name).includes(normQuery);

          // Filter products in category
          let filteredProducts = category.products.filter((product) => {
            const matchProdName = normalizeText(product.name).includes(normQuery);
            const matchProdDesc = product.description ? normalizeText(product.description).includes(normQuery) : false;
            const matchPrice = product.price.toString().includes(normQuery) || `$${product.price}`.includes(normQuery);

            const searchMatches =
              normQuery === '' ||
              matchProdName ||
              matchProdDesc ||
              matchPrice ||
              matchCatName ||
              matchMunicipioName ||
              matchGrades ||
              matchLocation ||
              matchZone;

            const categoryChipMatches = matchesCategoryFilter(category.name, product.name, activeCategoryFilter);

            return searchMatches && categoryChipMatches;
          });

          // Apply sorting inside category products if sort active
          if (sortBy !== 'default') {
            filteredProducts = [...filteredProducts].sort((a, b) => {
              if (sortBy === 'price-asc') return a.price - b.price;
              if (sortBy === 'price-desc') return b.price - a.price;
              if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
              return 0;
            });
          }

          if (filteredProducts.length === 0) return null;

          return {
            ...category,
            products: filteredProducts,
          };
        }).filter(Boolean);

        if (filteredCategories.length === 0) return null;

        return {
          ...municipio,
          categories: filteredCategories as any[],
        };
      }).filter(Boolean);

      if (filteredMunicipios.length === 0) return null;

      return {
        ...zone,
        municipios: filteredMunicipios as any[],
      };
    }).filter(Boolean);
  }, [searchQuery, selectedZoneId, selectedMunicipioId, activeCategoryFilter, sortBy]);

  // Total results count calculation
  const totalResultsCount = useMemo(() => {
    let count = 0;
    filteredZones.forEach((z) => {
      z?.municipios.forEach((m) => {
        m.categories.forEach((c) => {
          count += c.products.length;
        });
      });
    });
    return count;
  }, [filteredZones]);

  const showBanksSection = selectedZoneId === 'bancos' || selectedZoneId === 'todos' || activeCategoryFilter === 'bancos';

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 font-sans flex flex-col antialiased">
      {/* 1. Header Component */}
      <Header
        totalCartItems={totalCartItemsCount}
        totalCartCOP={totalCartCOP}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(true)}
      />

      {/* 2. Navigation Bar Component */}
      <Navigation
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
        selectedMunicipioId={selectedMunicipioId}
        onSelectMunicipio={setSelectedMunicipioId}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Real-Time Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategoryFilter={activeCategoryFilter}
          onCategoryFilterChange={setActiveCategoryFilter}
          totalResultsCount={totalResultsCount}
        />

        {/* 🏦 Banks & Ficho Exchange Section */}
        {showBanksSection && (
          <div id="bancos-seccion" className="scroll-mt-32">
            <BanksSection />
          </div>
        )}

        {/* Catalog Zone Sections */}
        {filteredZones.length > 0 ? (
          <div className="space-y-12">
            {filteredZones.map((zone) => zone && (
              <ZoneSection
                key={zone.id}
                zone={zone}
                getCartQuantity={getCartQuantity}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          !showBanksSection && (
            <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-slate-300 max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-2xl">
                🔎
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                No encontramos productos con esta búsqueda
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Intenta buscar por otro término (ej: &quot;Limón&quot;, &quot;Postres&quot;, &quot;Fiambre&quot;) o restablece los filtros rápidos.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedZoneId('todos');
                  setSelectedMunicipioId('todos');
                  setActiveCategoryFilter('todos');
                }}
                className="py-2.5 px-5 bg-red-600 text-amber-300 font-bold text-xs rounded-xl hover:bg-red-700 transition-colors shadow-sm"
              >
                Ver Todo el Catálogo
              </button>
            </div>
          )
        )}
      </main>

      {/* 4. Footer Component */}
      <Footer />

      {/* 5. Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
        selectedMunicipioId={selectedMunicipioId}
        onSelectMunicipio={setSelectedMunicipioId}
        activeCategoryFilter={activeCategoryFilter}
        onCategoryFilterChange={setActiveCategoryFilter}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        totalCartItems={totalCartItemsCount}
      />

      {/* 6. Floating Cart Bar */}
      <CartFloatingBar
        totalItems={totalCartItemsCount}
        totalCOP={totalCartCOP}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* 7. Calculator / Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onFinalizeCalculation={() => {
          setIsCartDrawerOpen(false);
          setIsSummaryModalOpen(true);
        }}
      />

      {/* 8. Summary Simulation Modal */}
      <SummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        cartItems={cartItems}
        totalCOP={totalCartCOP}
        onClearCart={handleClearCart}
      />

      {/* 9. Back to Top Floating Button */}
      <BackToTop />
    </div>
  );
}
