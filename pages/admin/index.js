import dynamic from 'next/dynamic';

const ReactAdmin = dynamic(() => import('../../components/admin/ReactAdmin'), {
  ssr: false,
});

const HomePage = () => <ReactAdmin />;

export default HomePage;
