import Layout from 'layout/split';
import Search from 'features/Search';
import FeaturedUsers from 'features/FeaturedUsers';

export default function Home() {
  return (
    <Layout main={<Search />} aside={<FeaturedUsers />} />
  )
}
