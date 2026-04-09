# Pages

One file per route. Pages import and compose section/layout components.

| File                | Route                          | Notes                                      |
|---------------------|--------------------------------|--------------------------------------------|
| Home.jsx            | /                              | Full homepage with all major sections      |
| ConcreteAsphalt.jsx | /services/concrete-asphalt     | Service page                               |
| SnowIce.jsx         | /services/snow-ice             | Most content-rich — key differentiator page|
| DesignBuild.jsx     | /services/design-build         | Service page                               |
| About.jsx           | /about                         | Company story + values                     |
| Contact.jsx         | /contact                       | Quote form + direct contact sidebar        |

## Adding a new page
1. Create the file here: `src/pages/NewPage.jsx`
2. Add a `<Route>` in `src/App.jsx`
3. Add nav links in `Navbar.jsx` and `Footer.jsx`
4. Add the route to `src/data/services.js` if it's a service page

## Content editing tips
- All page copy is inline JSX — find the section and edit the text directly
- Contact info is never hardcoded in pages — it comes from `src/data/siteConfig.js`
- Hero images are referenced via the `bgImage` prop on `<Hero />`
