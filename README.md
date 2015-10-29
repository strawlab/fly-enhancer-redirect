# fly-enhancer-redirect

This is the sourcecode to a fly-enhancer-redirect. You can see it in action at
https://strawlab.org/fly-enhancer-redirect .

Originally,this site was built according to the recipe by [Brent
Jackson](http://jxnblk.com/writing/posts/static-site-generation-with-react-and-webpack/).
Since then, it has evolved.

## Potential future improvement

In theory, most of the pages in this site could be pre-rendered on the
server-side and then the javascript could alter/update them. However, when I
tried to do that, I was getting strange errors much like
[this](https://github.com/rackt/react-router/issues/1402#issuecomment-116723037).
It seems that the various static React-based site generators do not expect
dynamic data, e.g. from a query in the URL. Anyhow, if these errors could be
fixed, the server-side pre-rendering could be turned on.

## prior to building or developing

You must install `node_modules`:

    npm update

## building for deployment

To build the site, you need npm installed. Then:

    npm run webpack

The resulting site will be in `_site`.

## development

To run a development server, run:

    npm start
