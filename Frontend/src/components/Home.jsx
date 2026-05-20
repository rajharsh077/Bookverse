import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/2016/08/Old-Library-Wallpaper.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0"></div>

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col justify-center items-center h-[calc(100vh-80px)] text-center px-4">
          <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-2xl border border-white/30">
            <h2 className="text-4xl sm:text-5xl font-bold text-yellow-300 drop-shadow mb-4">
              Welcome to the Library
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-6">
              Your gateway to knowledge — explore, borrow, and learn effortlessly.
            </p>
            <a
              href="/signup"
              className="inline-block bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition"
            >
              Get Started
            </a>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section
        className="bg-cover bg-center text-white py-16 px-6 sm:px-12 md:px-20 relative"
        style={{
          backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/2016/08/Old-Library-Wallpaper.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-center mb-12 text-yellow-300">
            What You Can Do
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <FeatureCard
              title="Browse Books"
              desc="Search and explore books from various genres in one place."
              icon="https://cdn-icons-png.flaticon.com/512/2908/2908597.png"
            />
            <FeatureCard
              title="Lend Easily"
              desc="One-click lending to borrow and manage books you love."
              icon="https://cdn-icons-png.flaticon.com/512/3616/3616982.png"
            />
            <FeatureCard
              title="Track Activity"
              desc="View all your lent books and manage them in your profile."
              icon="https://cdn-icons-png.flaticon.com/512/1001/1001371.png"
            />
            <FeatureCard
              title="Discover New Releases"
              desc="Get notified about the latest books added to the library."
              icon="https://cdn-icons-png.flaticon.com/512/1509/1509504.png"
            />
            <FeatureCard
              title="Curated Book Collections"
              desc="Browse curated collections for your reading pleasure."
              icon="https://cdn-icons-png.flaticon.com/512/2528/2528002.png"
            />
            <FeatureCard
              title="Personalized Recommendations"
              desc="Get book suggestions based on your reading history."
              icon="https://cdn-icons-png.flaticon.com/512/4379/4379675.png"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-800 text-white py-16 px-6 sm:px-12 md:px-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-yellow-300">
          How It Works
        </h3>
        <div className="text-center text-lg text-gray-200">
          <p className="mb-4">Our library system is designed to make your reading journey simple and enjoyable. Here's how it works:</p>
          <ul className="list-disc list-inside text-gray-300">
            <li className="mb-2">1. Sign up to create your account.</li>
            <li className="mb-2">2. Browse and borrow books instantly.</li>
            <li className="mb-2">3. Track your activity and lent books.</li>
            <li className="mb-2">4. Enjoy reading and participate in events.</li>
          </ul>
        </div>
      </section>

      {/* Reader Reviews Section */}
      {/* Reader Reviews Section */}
<section className="bg-gray-900 text-white py-16 px-6 sm:px-12 md:px-20">
  <h3 className="text-3xl font-bold text-center mb-12 text-yellow-300">
    Reader Reviews
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
    {[
      {
        name: "Aarav S.",
        rating: 5,
        comment: "Amazing collection! Found books I couldn’t find elsewhere. Highly recommend the library to everyone who loves to read and explore different genres.",
      },
      {
        name: "Meera K.",
        rating: 4,
        comment: "Smooth lending process and helpful features! A few more book categories would make it even better.",
      },
      {
        name: "Rohit B.",
        rating: 5,
        comment: "Love the UI and fast access to all my favorite genres. The staff is also very friendly and knowledgeable.",
      },
      {
        name: "Isha T.",
        rating: 4,
        comment: "Would love a mobile app too! But overall, great job. The web experience is good, though a bit slow during peak hours.",
      },
      {
        name: "Devansh R.",
        rating: 5,
        comment: "The recommendations are on point — highly impressed! The variety of genres and authors is fantastic.",
      },
    ].slice(0, 4).map((review, index) => (
      <div
        key={index}
        className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 w-full aspect-w-1 aspect-h-1 flex flex-col justify-between"
      >
        <div>
          <h4 className="text-lg font-semibold text-yellow-300 mb-1">{review.name}</h4>
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-yellow-400 text-sm ${i < review.rating ? '' : 'opacity-30'}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-300 text-sm line-clamp-3">{review.comment}</p>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-right">— Reader</p>
      </div>
    ))}
  </div>
</section>


      {/* Contact Us Section */}
      <section className="bg-purple-800 text-white py-16 px-6 sm:px-12 md:px-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-yellow-300">
          Contact Us
        </h3>
        <div className="text-center text-lg text-gray-200">
          <p className="mb-6">We'd love to hear from you! If you have any questions or feedback, feel free to reach out to us:</p>
          <a
            href="mailto:support@library.com"
            className="inline-block bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition"
          >
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-white text-center py-6">
        © 2025 Digital Library | Built with ❤️ by Team
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon }) => (
  <div className="bg-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
    <img src={icon} alt={title} className="h-16 w-16 mx-auto mb-4" />
    <h4 className="text-xl font-semibold text-purple-700 text-center mb-2">{title}</h4>
    <p className="text-center text-gray-600">{desc}</p>
  </div>
);

export default Home;
