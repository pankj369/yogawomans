import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function Wishlist() {
  const auth = useAuth();
  const { profile } = useDashboard();
  const {
    wishlistItems,
    toggleWishlist,
    clearWishlist,
  } = useWishlist();

  const userName = profile?.full_name || auth.user?.name || "Yogi";

  return (
    <DashboardLayout userName={userName} title="Wishlist">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6 rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[18px]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-wellness-orange">
            Wishlist
          </p>
          <h1 className="mt-2 text-3xl font-heading font-extrabold text-white">
            Saved products
          </h1>
        </div>

        {wishlistItems.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-[2rem] border border-wellness-border bg-wellness-glass shadow-glass group transition-all duration-300 hover:border-wellness-glow/20"
              >
                <div className="overflow-hidden h-56 w-full">
                  <img
                    src={product.products?.image_url}
                    alt={product.products?.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-heading font-bold text-white group-hover:text-wellness-glow transition-colors">
                    {product.products?.name}
                  </h2>

                  <p className="text-sm text-wellness-muted font-medium leading-relaxed line-clamp-2">
                    {product.products?.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      to={`/shop/${product.products?.slug}`}
                      className="text-sm font-bold text-wellness-glow hover:underline transition-colors"
                    >
                      View details
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        toggleWishlist({
                          id: product.product_id,
                        })
                      }
                      className="rounded-full border border-wellness-border bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-wellness-border bg-wellness-glass p-10 text-center shadow-glass backdrop-blur-[18px]">
            <p className="text-lg font-bold text-white">
              Your wishlist is empty.
            </p>
            <p className="mt-2 text-sm text-wellness-muted font-medium">
              Save products to revisit them later.
            </p>
          </div>
        )}

        {wishlistItems.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="mt-6 rounded-full border border-wellness-border bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            Clear wishlist
          </button>
        )}

      </div>
    </DashboardLayout>
  );
}