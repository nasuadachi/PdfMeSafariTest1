# iPadOS 18.3 + PdfMe + Angular19 test



## To Reproduce

```shell
yarn install
yarn run start
```

1. Access ```http://your IP:4200``` in Safari on your iPad
2. 'RUN' Check box is turned on.
3. Monitor memory consumption (Web Inspector from the Develop menu)

## Expected behavior

 When running in Safari, ngOnDestroy in PdfMeFormComponent completely frees memory.


 AppComponent alternates between Page1Component and Page2Component by router.
 Page1Component calls PdfMeFormComponent as a child.
 PdfMeFormComponent passes the dom to PdfMe and asks PdfMe to draw it.
 When switching to Page2, PdfMeFormComponent's ngOnDestroy() is automatically called. We want to release all memory at this time.


## Your Environment

- Operating system, iOS 18.3.1 / iPadOS18.3.1 / macOS Sequoia 15.3.1
- PdfMe 5.3.5
- Angular 19
- node version 	^18.19.1 || ^20.11.1 || ^22.0.0
 https://angular.dev/reference/versions

## Your Error Log

none.
