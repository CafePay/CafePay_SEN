angular.module('Cafepay',['Cafepay.Services','Cafepay.Controllers','ui.router','uiRouterStyles','monospaced.qrcode'])


.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/entry.html',
            controller: 'MainController',
            data: {
			    css: 'css/entry.css'
			}
        })
        .state('forbidden', {
            url: '/forbidden',
            templateUrl: 'views/forbidden.html',
            //controller: 'vendorProfileController',
            /*data: {
                css: 'css/vendorprofile.css'
            }*/

        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'views/customerprofile1.html',
            controller: 'customerProfileController',
            data: {
			    css: 'css/styles.css'
			}

        })
        .state('vendor', {
            url: '/vendor',
            templateUrl: 'views/vendorprofile1.html',
            controller: 'vendorProfileController',
            data: {
                css: 'css/styles.css'
            }

        })

        .state('customer.myqr', {
            url: '/myqrcodes',
            templateUrl: 'views/customermyqr.html',
            controller: 'customerMyqrController',
            data: {
                css: 'css/styles.css'
            }

        })

        .state('vendor.scan', {
            url: '/scanqrcodes',
            templateUrl: 'views/vendorscan.html',
            //controller: 'vendorScanController',
            /*data: {
                css: 'css/generate1.css'
            }*/

        })
        .state('customer.generate', {
            url: '/generate',
            templateUrl: 'views/customergenerate.html',
            controller: 'customerGenerateController',
            data: {
                css: 'css/customergenerate.css'
            }

        })
        .state('customer.recharge', {
            url: '/recharge',
            templateUrl: 'views/customerrecharge.html',
            controller: 'customerRechargeController',
            /*data: {
                css: 'css/profile1.css'
            }*/

        })

        .state('vendor.withdrawal', {
            url: '/withdrawal',
            templateUrl: 'views/vendorwithdrawal.html',
            controller: 'vendorWithdrawalController',
            /*data: {
                css: 'css/profile1.css'
            }*/

        })
        .state('customer.history', {
            url: '/history',
            templateUrl: 'views/customerprofile.html',
            controller: 'customerProfileController',
            /*data: {
                css: 'css/profile1.css'
            }*/

        })
        .state('customer.complaint', {
            url: '/complaint',
            templateUrl: 'views/complaint.html',
            controller: 'customerComplaintController',
            data: {
                css: 'css/complaint.css'
            }

        })
        .state('vendor.complaint', {
            url: '/complaint',
            templateUrl: 'views/complaint.html',
            controller: 'vendorComplaintController',
            data: {
                css: 'css/complaint.css'
            }

        })
        .state('customer.feedback', {
            url: '/feedback',
            templateUrl: 'views/customerfeedback.html',
            controller: 'customerFeedbackController',
            data: {
                css: 'css/customerfeedback.css'
            }

        })
        .state('customer.changepassword', {
            url: '/changepassword',
            templateUrl: 'views/changepassword.html',
            controller: 'ChangepasswordController',
            data: {
                css: 'css/changepassword.css'
            }

        })
        .state('vendor.changepassword', {
            url: '/changepassword',
            templateUrl: 'views/changepassword.html',
            controller: 'ChangepasswordController',
            data: {
                css: 'css/changepassword.css'
            }

        })

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            data: {
			    css: 'css/login.css'
			}
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignupController',
            data: {
			    css: 'css/signup.css'
			}
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/forgot.html',
            controller: 'ForgotController',
            data: {
                css: 'css/forgot.css'
            }
        })

        .state('admin', {
            url: '/admin',
            templateUrl: 'views/adminprofile1.html',
            controller: 'adminProfileController',
            data: {
                css: 'css/styles.css'
            }

        })
        .state('committee', {
            url: '/committee',
            templateUrl: 'views/committeeprofile1.html',
            controller: 'committeeProfileController',
            data: {
                css: 'css/styles.css'
            }

        })
        /*.state('.adminlog', {
            url: '/log',
            templateUrl: 'views/vendorprofile1.html',
            controller: 'vendorProfileController',
            data: {
                css: 'css/styles.css'
            }

        })*/

      //  $locationProvider.html5Mode(true);
});

