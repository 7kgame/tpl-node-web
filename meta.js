module.exports = {
  prompts: {
    name: {
      message: "Project name"
    },
    version: {
      message: "Project version",
      default: "1.0.0"
    },
    description: {
      message: "Project description",
      default: "nodejs web framework"
    },
    author: {
      message: "Author"
    },
    host: {
      message: "set host for the httpserver",
      default: 'localhost'
    },
    port: {
      type: "nubmer",
      message: "set port for the httpserver",
      default: 3000
    },
    repositories: {
      type: "checkbox",
      message: "select repositories",
      choices: [
        {
          name: "mongodb",
          //checked: true
        },
        {
          name: "mysql",
        },
        {
          name: "redis",
        },
      ]
    }
  },
  include: [
    '*.json',
    '*.js',
    '*.ts',
  ],
  exclude: [
  ]
}
