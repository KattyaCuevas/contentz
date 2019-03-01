const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile, exists } = require("./fs");

const ErrorPage = require("../components/error");
const Document = require("../components/document");

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "404.html"), html, "utf8");
}

async function render(config) {
  if (!await exists("./public/404.html")) {
    try {
      const html = renderStylesToString(
        ReactDOMServer.renderToStaticMarkup(
          jsx(Document, { config }, jsx(ErrorPage, { config }))
        )
      );
      await writeContent(html);
    } finally {
      console.log("Render completed: Error");
    }
  }
}

module.exports = render;