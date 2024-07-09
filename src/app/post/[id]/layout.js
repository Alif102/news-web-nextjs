import axios from 'axios';

export async function generateMetadata({ params }) {
  const id = params.id;

  // Fetch or calculate your dynamic metadata here
  let title = 'Default Title';
  let description = 'Default description';
  let imageUrl = 'https://news-nextjs-phi.vercel.app/_next/image?url=https%3A%2F%2Fadmin.desh365.top%2Fpublic%2Fstorage%2Fpost-image%2F9040_1716980287.webp&w=384&q=75';
  let url = `https://news-nextjs-phi.vercel.app/post/${id}`;


  try {
    const response = await axios.get(`https://admin.desh365.top/api/post/${id}`);
    const postData = response.data.data;

    title = postData.title || title;
    description = postData.post_body || description;
    imageUrl = postData.image ? `https://admin.desh365.top/public/storage/post-image/${postData.image}` : imageUrl;

  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title,
    description,
    url,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      site_name: 'News Portal',
      'fb:app_id': '972318721003725',
    },
    
}
}

export default function DetailLayout({ children }) {
  return <>{children}</>;
}