import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Vote from "../components/vote"

import { Helmet } from "react-helmet"
import "twin.macro"
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCodeBranch,
  FaCopyright,
  FaExclamationCircle,
  FaEye,
  FaHome,
  FaLink,
  FaOsi,
  FaStar,
  FaTags,
} from "react-icons/fa"

const getIntroText = tool => {
  let license = "A Proprietary"
  if (!tool.proprietary) {
    license = "An Open Source"
  }
  let taglist = tool.tags.join(", ")
  return `${license} analysis tool for ${taglist}`
}

export default function BlogPost(d) {
  const tool = d.data.toolsYaml
  const introText = getIntroText(tool)
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {tool.name}, {introText}
        </title>
      </Helmet>
      <article tw="flex shadow my-4 w-full">
        <div tw="bg-white flex justify-start p-6 w-full">
          <div tw="w-12 flex-none">
            <Vote key={tool.children[0].key} sum={tool.children[0].sum} />
          </div>
          <div tw="flex-auto pl-5">
            <h1 tw="text-3xl font-semibold mb-5">{tool.name}</h1>
            {"created_at" in tool.fields.githubStats && (
              <ul tw="mb-3">
                <a tw="underline mr-3" href={tool.source}>
                  <FaCalendarAlt tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.created_at}
                </a>
                <a tw="underline mr-3" href={tool.source}>
                  <FaStar tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.stargazers_count}
                </a>
                <a tw="underline mr-3" href={tool.source}>
                  <FaCodeBranch tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.forks_count}
                </a>
                <a tw="underline mr-3" href={tool.source}>
                  <FaEye tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.watchers_count}
                </a>
                <a tw="underline mr-3" href={tool.source}>
                  < FaExclamationCircle tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.open_issues_count}
                </a>
              </ul>
            )}
            <p tw="pb-3">{tool.description}</p>
            <p tw="mb-3">
              <FaHome tw="mb-1 mr-2 inline-block" />
              <a tw="underline" href={tool.homepage}>
                {tool.homepage}
              </a>
            </p>
            {tool.source && (
              <p tw="mb-3">
                <FaLink tw="mb-1 mr-2 inline-block" />
                <a tw="underline" href={tool.source}>
                  {tool.source}
                </a>
              </p>
            )}
            {tool.proprietary ? (
              <p tw="mb-3">
                <FaCopyright tw="mb-1 mr-2 inline-block" /> Proprietary{" "}
              </p>
            ) : (
              <p tw="mb-3">
                <FaOsi tw="mb-1 mr-2 inline-block" /> Open Source {tool.fields.githubStats.license.name}
              </p>
            )}
            {tool.deprecated ? (
              <p tw="mb-3">
                <FaExclamationCircle tw="mb-1 mr-2 inline-block" />{" "}
                Deprecated/Unmaintained{" "}
              </p>
            ) : (
              <p tw="mb-3">
                <FaCheckCircle tw="mb-1 mr-2 inline-block" /> Maintained
              </p>
            )}
            <p>
              <FaTags tw="mb-1 mr-2 inline-block align-top" />
              <ul tw="list-none max-w-sm inline-block align-top">
                {tool.tags.map(tag => (
                  <li tw="mb-2 mr-1 inline-block" key={tag}>
                    <a href={"/tag/" + tag}>
                      <span tw="bg-color-gray-200 px-2 py-1 rounded">
                        {tag}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    toolsYaml(fields: { slug: { eq: $slug } }) {
      name
      description
      proprietary
      deprecated
      homepage
      source
      tags
      fields {
        slug
        githubStats {
          stargazers_count
          created_at(formatString: "YYYY")
          # archived
          forks_count
          language
          license {
            name
          }
          open_issues_count
          organization {
            avatar_url
          }
          owner {
            avatar_url
          }
          size
          watchers_count
        }
      }
      children {
        ... on Votes {
          sum
          downVotes
          upVotes
          key
        }
      }
    }
  }
`
