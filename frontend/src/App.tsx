import Assistant from './components/Assistant';

// Placeholder data - CUSTOMIZE THIS FOR YOUR OWN PROFILE
const USER_PROFILE = {
  profileImage: '/profile.jpeg', // Place your image in public/profile.jpeg
  name: 'S. Kaveen',
  title: 'Full Stack Developer & AI Enthusiast',
  degree: 'BSc (Hons) Software Engineering (Undergraduate)',
  bio: 'Passionate Full Stack Developer with a strong focus on AI implementation. Also a Cybersecurity enthusiast on the path to mastering security principles.',
};

function App() {
  return (
    <div className="font-sans antialiased text-white bg-black-rich min-h-screen">
      <Assistant data={USER_PROFILE} />
    </div>
  );
}

export default App;
