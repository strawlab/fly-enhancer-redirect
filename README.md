# redirect.strawlab.org

This is the sourcecode to [http://redirect.strawlab.org](http://redirect.strawlab.org).

This site was built according to the recipe by [Brent Jackson](http://jxnblk.com/writing/posts/static-site-generation-with-react-and-webpack/)

## This code has a serious bug

Due to behavior with react-router that I don't understand, I was getting React
errors much like
[this](https://github.com/rackt/react-router/issues/1402#issuecomment-116723037).
I have not solved the issue and consequently error messages show up on the
console and in the browser. Nonetheless, the redirection works and so I'm
putting this online in the present state and hope to fix the bug later.

## prior to building or developing

You must install `node_modules`:

    npm update

## building for deployment

To build the site, you need npm installed. Then:

    npm run webpack

The resulting site will be in `_site`.

Assuming your local server is running at http://localhost:8000, you can check
that it works with these URLs:

    http://localhost:8000/redirect/v1/bbweb/?vt=05534
    http://localhost:8000/redirect/v1/vdrc/?vt=05534
    http://localhost:8000/redirect/v1/flylight/?line=R27B03

## development

To run a development server, run:

    npm start
