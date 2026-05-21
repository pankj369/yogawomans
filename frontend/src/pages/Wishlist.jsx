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

        <div className="mb-6 rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(72,42,8,0.1)]">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b6c48]">
            Wishlist
          </p>

          <h1 className="mt-2 text-3xl font-heading font-extrabold">
            Saved products
          </h1>

        </div>



        {wishlistItems.length ? (

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {wishlistItems.map((product) => (

              <div
                key={product.id}
                className="overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_20px_60px_rgba(72,42,8,0.1)]"
              >

                <img
                  src={product.products?.image_url}
                  alt={product.products?.name}
                  className="h-56 w-full object-cover"
                />



                <div className="space-y-3 p-5">

                  <h2 className="text-xl font-heading font-bold">
                    {product.products?.name}
                  </h2>



                  <p className="text-sm text-[#666]">
                    {product.products?.description}
                  </p>



                  <div className="flex items-center justify-between">

                    <Link
                      to={`/shop/${product.products?.slug}`}
                      className="text-sm font-semibold text-[#2E7D32]"
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
                      className="rounded-full border border-[#d6c5af] px-4 py-2 text-sm font-semibold text-[#6c5847]"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        ) : (

          <div className="rounded-[2rem] border border-white/60 bg-white/70 p-10 text-center shadow-[0_20px_60px_rgba(72,42,8,0.1)]">

            <p className="text-lg font-semibold">
              Your wishlist is empty.
            </p>

            <p className="mt-2 text-sm text-[#666]">
              Save products to revisit them later.
            </p>

          </div>
        )}



        {wishlistItems.length > 0 && (

          <button
            type="button"
            onClick={clearWishlist}
            className="mt-6 rounded-full border border-[#d6c5af] px-5 py-3 text-sm font-semibold text-[#6c5847]"
          >
            Clear wishlist
          </button>

        )}

      </div>
    </DashboardLayout>
  );
}