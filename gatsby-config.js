module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "EzExam",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/asset/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/examinee/*`, `/examiner/*`, `/admin/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/resources/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/publicVideos/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  ],
};
