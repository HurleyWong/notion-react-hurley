// import { Client } from '@notionhq/client'
const { Client } = require('@notionhq/client');
// import { notion } from './client';

const notion = new Client({ auth: process.env.NOTION_KEY })
const articleDatabaseId = process.env.ARTICLE_NOTION_DATABASE_ID || '2bab272a4f5848108093d55189ae1eca'
const blogDatabaseId = process.env.BLOG_NOTION_DATABASE_ID || 'f096c65c89164a4eab0b75e9eecd6cde'
const notesDatabaseId = process.env.NOTES_NOTION_DATABASE_ID || 'd3e552943751481c943608551f5c5b1b'

export const getArticleDatabase = async (slug?: string) => {
  let dbQuery: any = {
    database_id: articleDatabaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
  }

  if (slug) {
    dbQuery.filter.and.push({ property: 'slug', rich_text: { equals: slug } })
  }

  const response = await notion.databases.query(dbQuery)
  return response.results
}

export const getBlogDatabase = async (slug?: string) => {
  let dbQuery: any = {
    database_id: blogDatabaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
  }

  if (slug) {
    dbQuery.filter.and.push({ property: 'slug', rich_text: { equals: slug } })
  }

  const response = await notion.databases.query(dbQuery)
  return response.results
}

export const getNotesDatabase = async (slug?: string) => {
  let dbQuery: any = {
    database_id: notesDatabaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
  }

  if (slug) {
    dbQuery.filter.and.push({ property: 'slug', rich_text: { equals: slug } })
  }

  const response = await notion.databases.query(dbQuery)
  return response.results
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId: string) => {
  let results = [];
  let response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  results = [...response.results];
  while (response.has_more) {
    response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: response.next_cursor,
    });
    results = [...results, ...response.results];
  }
  return results;
};

// export const getBlocks = async (blockId: string) => {
//   const response = await notion.blocks.children.list({
//     block_id: blockId,
//     page_size: 100,
//   })
//   return response.results
// }

export const searchDatabase = async (query: string) => {
  const response = await notion.search({
    query: query,
    filter: { value: 'page', property: 'object' },
    page_size: 10,
  })
  return response.results
}
