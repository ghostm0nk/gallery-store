import React from 'react';

function AboutPage() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">About Gallery Store</h1>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to Gallery Store, your premier destination for exquisite digital portraits.
          We are passionate about art and technology, bringing together talented artists and art enthusiasts
          from around the globe. Our mission is to make unique digital art accessible to everyone,
          allowing you to own stunning pieces that inspire and captivate.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At Gallery Store, we believe in supporting artists and providing a platform for their
          creations to shine. Each digital portrait in our collection is carefully curated,
          ensuring high quality and originality. When you purchase from us, you're not just buying art;
          you're investing in creativity and empowering independent artists.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To be the leading online marketplace for digital art, fostering a vibrant community
          where artists thrive and art lovers discover their next masterpiece. We are constantly
          exploring new technologies to enhance the art buying experience and deliver unparalleled value.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Have questions or need assistance? Our dedicated customer support team is here to help.
          Reach out to us at <a href="mailto:support@gallerystore.com" className="text-blue-600 hover:underline">support@gallerystore.com</a> or through our contact page.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;