/* eslint-disable react/no-danger */

import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ContextualLinks from '../components/ContextualLinks/ContextualLinks';
import EditDoc from '../components/Shared/EditDoc';
import LeftNav from '../components/LeftNav/LeftNav';
import SEO from '../components/seo';
import './doc.scss';
import 'prismjs/themes/prism-tomorrow.css';
import pose from '../assets/pose-learning-center.svg';

import $ from 'jquery';
import 'jquery.scrollto';

export default ({ data }) => {
  const post = data.markdownRemark;
  let contextualLinks;
  if (post.frontmatter.contextual_links) {
    contextualLinks = <ContextualLinks links={post.frontmatter.contextual_links} />;
  }

  useEffect(() => {
    const navOffset = parseInt(-56, 10);

    // On load, check URL.  If it includes a hash, go to it and offset window by navOffset
      if (location.hash) {
        setTimeout(() => {
          $.scrollTo($(location.hash), {
            offset: navOffset
          });
        }, 500)
      }
    
    // when a link is clicked
    $('#content-container a').on('click', (e) => {    
      const currentPage = `${location.origin}${location.pathname}`;
      const desiredPage = `${e.target.href.split('#')[0]}`
      // Compare our current page to links href
      if (currentPage === desiredPage) {
        e.preventDefault();
        const targetHash = e.target.hash;
        // If the desiredPage the same page, scroll to the hash ID on the page
        $.scrollTo($(targetHash), {
          offset: navOffset
        })
        // And add that hash to the location bar
        window.location.hash = targetHash
      }
    });
  });
  
  return (
    <Layout>
      <SEO title={post.frontmatter.title} slug={post.fields.slug} />
      <div className="container-fluid">
        <div className="row row-eq-height">
          <nav className="col-sm-12 col-md-4 col-lg-3 left-nav">
            <LeftNav />
          </nav>
          <div className="col">
            <div className="row row-eq-height">
              <main className="col-sm-12 col-md-12 col-lg-9 offset-lg-0 col-xl-7 offset-xl-1 doc-page">
                <h1>{post.frontmatter.title}</h1>
                <span id="content-container" dangerouslySetInnerHTML={{ __html: post.html }} />
              </main>
              <aside className="col-sm-12 col-md-12 col-lg-3 offset-lg-0 col-xl-3 offset-xl-1 right-column">
                <hr className="d-block d-lg-none"/>
                <div className="edit-button">
                  <EditDoc className="btn btn__small btn__secondary-light edit-button-styles" />
                </div>
                {contextualLinks}
                <figure className="sticky w-75">
                  <img src={pose} alt="pose" className="img-fluid"/>
                </figure>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        contextual_links {
          type
          name
          url
          blog_tag
        }
      }
      fields {
        slug
      }
    }
  }
`;
/* eslint-enaable */
