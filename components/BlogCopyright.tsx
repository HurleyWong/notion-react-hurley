const BlogCopyright = ({ page, absoluteLink }: { page: any; absoluteLink: string }) => {
  return (
    <div className="rounded bg-light-400 text-sm -mb-4 p-4 relative overflow-hidden md:rounded-none md:-mx-4 dark:bg-dark-400">
      <div className="opacity-10 transform top-0 right-0 w-64 translate-x-10 translate-y-3 absolute">
        <svg
          className="fill-current"
          viewBox="0 0 800 704"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path
            d="M400.98 130.135c50.883-55.103 110.318-80.162 179.132-70.454 71.026 10.02 131.5 60.798 153 129.238 16.543 52.662 9.676 111.642-12.477 165.426-34.457 83.653-136.276 202.558-320.636 285.689-184.358-83.13-286.178-202.036-320.634-285.689-22.154-53.784-29.021-112.764-12.478-165.426 21.5-68.44 81.974-119.218 153.001-129.238 68.816-9.708 128.25 15.353 179.135 70.459l.976 1.06c.002.001.897-.974.982-1.065ZM400 51.988c-111.14-87.23-285.332-64.47-365.432 66.63C7.973 162.148-2.016 212.755.331 263c4.072 87.153 41.693 163.336 96.952 229.077 74.408 88.524 181.98 158.088 300.364 209.999.165.073 1.531.667 2.352 1.032.72-.303 1.98-.871 2.368-1.042 117.775-51.91 225.946-121.48 300.35-209.989C757.98 426.34 795.595 350.153 799.668 263c2.347-50.245-7.64-100.853-34.237-144.382-80.1-131.1-254.292-153.86-365.432-66.63Z"
            strokeWidth=".01728"
          />
          <path d="m397.157 373.77-50.596-25.08c-17.586 25.643-30.382 42.997-67.34 32.871-29.014-7.95-37.6-39.747-38.702-66.42-1.507-36.434 11.23-78.512 54.744-76.26 27.807 1.435 39.655 17.836 45.986 32.577l55.244-28.32c-27.212-51.914-90.983-69.569-145.036-55.102-57.52 15.395-86.653 68.308-85.632 125.37 1.044 58.33 29.043 108.718 89.192 121.869 29.327 6.41 61.259 4.92 88.416-8.696 21.018-10.537 44.368-30.877 53.724-52.81Zm238.507 0-50.596-25.08c-17.586 25.643-30.382 42.997-67.342 32.871-29.011-7.95-37.598-39.747-38.702-66.42-1.505-36.434 11.232-78.512 54.747-76.26 27.805 1.435 39.652 17.836 45.983 32.577L635 243.138c-27.211-51.914-90.981-69.569-145.037-55.102-57.518 15.395-86.652 68.308-85.63 125.37 1.043 58.33 29.043 108.718 89.192 121.869 29.326 6.41 61.259 4.92 88.416-8.696 21.018-10.537 44.368-30.877 53.724-52.81Z" />
        </svg>
      </div>
      <p className="font-medium leading-6">{page.properties.name.title[0].plain_text} - Hurley Wong</p>
      <p className="opacity-90 leading-5">
        <a href={absoluteLink} target="_blank" rel="noopener noreferrer">
          {/* {`${hostname}/blog/${router.query.slug}`} */}
          {absoluteLink}
        </a>
      </p>
      <p className="mt-2 opacity-90 grid grid-cols-3 md:w-2/3">
        <div>
          <div className="text-xs">Author</div>
          <div>{page.properties.author.people.map((person: { name: string }) => person.name).join(', ')}</div>
        </div>
        <div>
          <div className="text-xs">Date</div>
          <div>{page.properties.date.date.start}</div>
        </div>
        <div>
          <div className="text-xs">License</div>
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
            CC BY-NC-SA 4.0
          </a>
        </div>
      </p>
      <p className="font-medium leading-6">Please refer to the original page for availability of sharing.</p>
    </div>
  )
}

export default BlogCopyright
