import App from './components/App.jsx'
import Index from './components/Index.jsx'
import RedirectV1 from './components/RedirectV1.jsx'
import SubdirRedirect from './components/SubdirRedirect.jsx'
import { fixRoute } from './common/util'

const normalRoutes = {
  path: fixRoute('/'),
  component: App,
  childRoutes: [
    { path: 'v1/:destination', components: {main: RedirectV1} }
  ],
  indexRoute: { components: {main: Index} }
}

// -------------------------
const devRoutes = [
  {
    path: '/',
    component: SubdirRedirect
  },
  normalRoutes
]
// -------------------------

const finalRoutes = process.env.NODE_ENV === 'development' ? devRoutes : normalRoutes

export default finalRoutes
