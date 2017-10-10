---
title: Maintaining Jekyll Performance When Using Package Managers
taxonomies: []
author: Eric Carlisle
date: 2015-12-29 13:21:00
tags: ["Jekyll", "Ruby", "Package Managers"]
slug: "maintain-jekyll-performance-package-managers"
description: "Jekyll uses a preceding underscore to exclude resources from a site build. This article explains how to prevent performance drops by files added by package managers."
image:
  src: "img/blog/jekyll-logo.svg"
  alt: "Jekyll Logo"
  class: "article-image"
---

When getting started with a [Jekyll](http://jekyllrb.com/docs/structure/) site, it's very important to learn about its [directory structure](ahttp://jekyllrb.com/docs/structure) and how that works with the Jekyll generator. Most of this is very intuitative and you'll be quickly learning where to place templates, partials, posts, and general content pages.
<!--more-->

You'll notice all the initial folders and the site configuration file begin with an underscore.

{{< highlight bash >}}
.
├── _config.yml
├── _drafts
├── _includes
├── _layouts
├── _posts
├── _data
├── _site
└── index.html
{{< /highlight >}}

These folders are essentially plumbing that Jekyll needs to generate the site. When adding new files and folders, however, the underscore convention is very important. By naming a resource with a preceding underscore, you're telling Jekyll to exclude that file or folder from the site's build process.

Let's add a few new resources to this site:

{{< highlight text >}}
.
├── _projects.html
├── contact.html
├── _images
└── scripts
{{</ highlight >}}

On the next Jekyll build, the generator will ignore the `projects.html` file and `images` directory. The remaining items will be processed and placed into the `_site`, the default Jekyll destination directory.

{{< highlight bash >}}
.
├── _projects.html
├── contact.html
├── _images
├── _site
|   ├── scripts
|   └── contact.html
└── scripts
{{< /highlight >}}

Pretty straight forward, right? A straight-forward convention that's easy to remember. What could possibly go wrong?

One day I started noticing that my Jekyll builds were taking upwards of 2-3 minutes.  This is a tremendous lag compared to the subsecond build time I'd become accustomed to. After much Googling and some hair-pulling, I found the culprits.

{{< highlight bash >}}
.
├── bower_components
└── node_modules
{{< /highlight >}}

I'd recently started using NPM and Bower for that site. By not having the underscore on the package download folders, I was asking Jekyll to include an unneeded 12,000+ files in each build. Ouch!

The workaround for this is very easy and there were a couple of choices. If you're using Bower, you can customize it's download directory by making a `.bowerrc` file.

{{< highlight JavaScript >}}
{
  "directory": "_bower_components/"
}
{{< /highlight >}}

Node doesn't allow customization of the `node_modules` directory but we can alternately exclude via [_config.yml](http://jekyllrb.com/docs/configuration/), Jekyll's site configuration file.
{{< highlight yaml >}}
exclude:
  - bower_components
  - node_modules
{{< /highlight >}}

The exclude option is very handy, especially when you can't or don't want to deal with underscores.

{{< highlight yaml >}}
exclude:
  - bower_components
  - bower.json
  - CNAME
  - gulpfile.js
  - node_modules
  - license.md
  - package.json
  - README.md
  - npm-debug.log
{{< /highlight >}}


After making those changes, I was back to seeing the heart-warming subsecond build times again. Yay!

{{< highlight bash >}}
Regenerating: 1 file(s) changed at 2015-12-29 13:01:22 ...done in 0.243629 seconds.
{{< /highlight >}}
