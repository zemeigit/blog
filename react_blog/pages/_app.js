import '../styles/globals.css'
import '../public/style/component/header.css'
import '../public/style/component/author.css'
import '../public/style/pages/comm.css'
import '../public/style/pages/index.css'
import '../public/style/pages/detailed.css'
import '../public/style/component/footer.css'
import '../styles/Home.module.css'
import 'markdown-navbar/dist/navbar.css'
import 'highlight.js/styles/monokai-sublime.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
