import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: 'Times';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);


const Index = props => (
  <Layout>
    <h1>Batman TV shows</h1>
    <ul>
      {props.shows.map(post => (
        <PostLink key={post.id} post={post}/>
      ))}
    </ul>
    <style jsx>{`
        h1 {
          font-family: 'Strong';
        }

        ul {
          padding: 0;
        }
        `}</style>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
}

export default Index;