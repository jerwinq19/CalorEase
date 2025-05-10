
function LandingPage()  {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-green-700">CalTrack para sa </h1>
        <div className="space-x-4 text-sm">
          <a href="#" className="text-gray-600 hover:text-black">Login</a>
          <a href="#" className="text-gray-600 hover:text-black">Register</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Track what you eat. Stay on track.</h2>
        <p className="text-gray-500 mb-6">simple, smart calorie tracking for your everyday meals.</p>
        <div className="space-x-4">
          <button className="bg-gray-200 px-5 py-2 rounded hover:bg-gray-300">Learn more</button>
          <button className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600">Get started</button>
        </div>
        <div className="mt-4">
          <button className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400">Food List</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h3 className="text-xl font-bold mb-2">Making Nutrition Tracking Easier</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          We recognize the overwhelming nature of the majority of calorie-tracking apps. For this reason,
          we created Calorease to make tracking easy, interesting, and even enjoyable.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="text-3xl mb-2">📋</div>
            <h4 className="font-bold mb-2">Intuitive Tracking</h4>
            <p className="text-sm text-gray-600">
              Our simplified food logging system makes tracking your daily intake quick and hassle-free,
              with smart suggestions based on your habits.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-bold mb-2">Motivational Streaks</h4>
            <p className="text-sm text-gray-600">
              Stay consistent with our engaging streak system that rewards your daily logging and helps
              build healthy habits that last.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-3xl mb-2">🍴</div>
            <h4 className="font-bold mb-2">Professional Guidance</h4>
            <p className="text-sm text-gray-600">
              Get personalized advice from certified fitness trainers who can help you optimize your
              nutrition and achieve your goals faster.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Crush Your Health Goals with Confidence</h3>
        <p className="text-sm mb-4">Stop guessing. Start making progress. With Calorease, you can:</p>
        <ul className="list-disc pl-6 text-sm space-y-2">
          <li>Effortlessly track your daily nutrition with our smart search that learns your preferences</li>
          <li>Stay motivated with achievement badges and streak rewards that celebrate your consistency</li>
          <li>Get expert guidance from certified trainers who can customize plans based on your data</li>
          <li>Visualize your progress with intuitive charts and insights that show your journey</li>
        </ul>
        <a href="#" className="text-sm text-blue-500 mt-4 inline-block">LEARN MORE..</a>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        FOOTER
      </footer>
    </div>
  );
};

export default LandingPage;
