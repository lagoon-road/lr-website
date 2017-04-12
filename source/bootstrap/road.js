module.exports = road => {
  road
    .where('webserver', 'client')
      .middleware({
        debug                         : (next, relay, request) => { console.log(request.url); next() },
        'components.navigation'       : require('../middleware/components/navigation'),
        'components.home'             : require('../middleware/components/home'),
        'components.reference'        : require('../middleware/components/reference'),
        'components.lrCore'           : require('../middleware/components/reference/lrCore'),
        'components.lrServerRouter'   : require('../middleware/components/reference/lrServerRouter'),
        'components.lrServerRenderer' : require('../middleware/components/reference/lrServerRenderer'),
        'components.lrClientRouter'   : require('../middleware/components/reference/lrClientRouter'),
        'components.lrClientRenderer' : require('../middleware/components/reference/lrClientRenderer'),
        'components.lrUrlParser'      : require('../middleware/components/reference/lrUrlParser'),
        'components.faq'              : require('../middleware/components/faq'),
        'components.error'            : require('../middleware/components/error'),
        'components.noMatch'          : require('../middleware/components/noMatch'),
        'components.guide'                              : require('../middleware/components/guide'),
        'components.guideSetup'                         : require('../middleware/components/guide/setup'),
        'components.guideHelloWorld'                    : require('../middleware/components/guide/helloWorld'),
        'components.guideAddingServerSideRenderer'      : require('../middleware/components/guide/addingServerSideRenderer'),
        'components.guideHandlingStaticContent'         : require('../middleware/components/guide/handlingStaticContent'),
        'components.guideMakeASinglePageApp'            : require('../middleware/components/guide/makeASinglePageApp'),
        'components.guideWorkingWithDOMEvents'          : require('../middleware/components/guide/workingWithDOMEvents'),
        'components.guideAddingUrlParametersViaAParser' : require('../middleware/components/guide/addingUrlParametersViaAParser'),
      })
      .run('*', 'debug')
    .where('webserver')
      .run('*', 'layouts.default')
      .run('*', 'components.navigation')
      .noMatch('layouts.default')
    .where('client')
      .run('#navigation', 'events.navigation', 'domReady')
    .where('webserver', 'client')
      .run('/', 'components.home')
      .run('/guide', 'components.guide')
      .run('/guide/setup', 'components.guideSetup')
      .run('/guide/hello-world', 'components.guideHelloWorld')
      .run('/guide/adding-server-side-renderer', 'components.guideAddingServerSideRenderer')
      .run('/guide/handling-static-content', 'components.guideHandlingStaticContent')
      .run('/guide/make-a-single-page-app', 'components.guideMakeASinglePageApp')
      .run('/guide/working-with-dom-events', 'components.guideWorkingWithDOMEvents')
      .run('/guide/adding-url-parameters-via-a-parser', 'components.guideAddingUrlParametersViaAParser')
      .run('/reference', 'components.reference')
      .run('/reference/lr-core', 'components.lrCore')
      .run('/reference/lr-server-router', 'components.lrServerRouter')
      .run('/reference/lr-server-renderer', 'components.lrServerRenderer')
      .run('/reference/lr-client-router', 'components.lrClientRouter')
      .run('/reference/lr-client-renderer', 'components.lrClientRenderer')
      .run('/reference/lr-url-parser', 'components.lrUrlParser')
      .run('/faq', 'components.faq')
      .noMatch('components.noMatch')
      .error('components.error')
      .done('response.html')

  return road;
}
