module.exports = {
  siteMetadata: {
    title: `Glenwood Letterdrop Blog`,
    author: {
      name: `Glenwood`,
      summary: ` - successful medical practice starts here`,
    },
    description: `Our practice tools and services make running a medical practice - large or small, a breeze.`,
    siteUrl: `https://www.glenwoodsystems.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allLetterdropPosts } }) => {
              return allLetterdropPosts.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    title: node.title,
                    date: node.publishedOn,
                  },
                  {
                    description: node.subtitle || node.text,
                    date: node.publishedOn,
                    url: site.siteMetadata.siteUrl + node.url,
                    guid: site.siteMetadata.siteUrl + node.url,
                    custom_elements: [{ "content:encoded": node.text }],
                  }
                )
              })
            },
            query: `
              {
                allLetterdropPosts(sort: { fields: [publishedOn], order: DESC }) {
                  nodes {
                    id
                    url
                    title
                    publishedOn
                    coverImage {
                      url
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "@letterdropcom/gatsby-source-letterdrop",
      options: {
        apikey: "8WJ680S-Q4S4DJJ-K755CW8-24QSVJE",
        version: "v1",
      },
    },
  ],
}
