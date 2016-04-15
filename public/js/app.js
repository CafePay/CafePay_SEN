angular.module('Cafepay',['Cafepay.Services','Cafepay.Controllers','ui.router','uiRouterStyles','monospaced.qrcode','custom.dir'])


.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/entry.html',
            controller: 'MainController',
            data: {
                css: 'css/entryall.css'
            }
        })
        .state('forbidden', {
            url: '/forbidden',
            templateUrl: 'views/forbidden.html'
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
            controller: 'vendorScanController'
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
            controller: 'customerRechargeController'
            /*data: {
                css: 'css/profile1.css'
            }*/

        })

        .state('vendor.withdrawal', {
            url: '/withdrawal',
            templateUrl: 'views/vendorwithdrawal.html',
            controller: 'vendorWithdrawalController'
            /*data: {
                css: 'css/profile1.css'
            }*/

        })
        .state('customer.history', {
            url: '/history',
            templateUrl: 'views/customerhistory.html',
            controller: 'customerHistoryController',
            data: {
                css: 'css/styles.css'
            }

        })
        .state('vendor.history', {
            url: '/history',
            templateUrl: 'views/vendorhistory.html',
            controller: 'vendorHistoryController',
            data: {
                css: 'css/styles.css'
            }

        })
        .state('customer.complaint', {
            url: '/complaint',
            templateUrl: 'views/customercomplaint.html',
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
        .state('committee.changepassword', {
            url: '/changepassword',
            templateUrl: 'views/changepassword.html',
            controller: 'ChangepasswordController',
            data: {
                css: 'css/changepassword.css'
            }

        })
        .state('admin.changepassword', {
            url: '/changepassword',
            templateUrl: 'views/changepassword.html',
            controller: 'ChangepasswordController',
            data: {
                css: 'css/styles.css'
            }

        })

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            data: {
                css: 'css/entryall.css'
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignupController',
            data: {
                css: 'css/entryall.css'
            }
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/forgot.html',
            controller: 'ForgotController',
            data: {
                css: 'css/entryall.css'
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

         .state('admin.logs', {
            url: '/logs',
            templateUrl: 'views/adminlogs.html',
            controller: 'adminLogController',
            data: {
                css: 'css/styles.css'
            }

        })

         .state('admin.logswr', {
            url: '/logs',
            templateUrl: 'views/adminlogswr.html',
            controller: 'adminLogwrController',
            data: {
                css: 'css/styles.css'
            }

        })
         .state('customer.logswr', {
            url: '/logs',
            templateUrl: 'views/customerlogswr.html',
            controller: 'customerLogwrController',
            data: {
                css: 'css/styles.css'
            }

        })
         .state('vendor.logswr', {
            url: '/logs',
            templateUrl: 'views/vendorlogswr.html',
            controller: 'vendorLogwrController',
            data: {
                css: 'css/styles.css'
            }

        })
         .state('committee.feeds', {
            url: '/feedbacks',
            templateUrl: 'views/committeefeedback.html',
            controller: 'committeeFeedbackController',
            data: {
                css: 'css/styles.css'
            }

        })
         .state('committee.recharge', {
            url: '/approverecharge',
            templateUrl: 'views/committeerecharge.html',
            controller: 'committeeRechargeController',
            data: {
                css: 'css/styles.css'
            }

        })
         .state('committee.withdrawal', {
            url: '/approvewithdrawal',
            templateUrl: 'views/committeewithdrawal.html',
            controller: 'committeeWithdrawalController',
            data: {
                css: 'css/styles.css'
            }

        })
         .state('admin.complaints', {
            url: '/complaints',
            templateUrl: 'views/admincomplaint.html',
            controller: 'adminComplaintController',
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
});

