import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/scrunchy", name: "Scrunchies", imageUrl: "/scrunchy.jpg" },
	{ href: "/hamper", name: "Hampers", imageUrl: "/hamper.jpg" },
	{ href: "/shirtbox", name: "Shirt Boxes", imageUrl: "/shirtbox.jpg" },
	{ href: "/greeting-card", name: "Greeting Cards", imageUrl: "/greetingcard.jpg" },
	{ href: "/invitation-card", name: "Invitation Cards", imageUrl: "/weddingcard.jpg" },
	{ href: "/keychain", name: "Keychains", imageUrl: "/keychain.jpg" },
	{ href: "/tote-bag", name: "Tote Bags", imageUrl: "/totebag.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-pink-600 mb-4'>
					Explore Categories
				</h1>
				<p className='text-center text-xl text-white dark:text-black mb-12'>
					Gifting is a way of lighting up someone's day with a little something special.
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;