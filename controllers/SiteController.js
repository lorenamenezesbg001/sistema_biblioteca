 export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          
          res.render('site/login');
        };

       

    }
 }