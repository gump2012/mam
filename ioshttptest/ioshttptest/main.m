//
//  main.m
//  ioshttptest
//
//  Created by lishiming on 14-6-18.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//
#import "regist.h"
#import "login.h"
#import "findpassword.h"
int main(int argc, const char * argv[])
{

    @autoreleasepool {
        BaseHttpRequest *testres = [[findpassword alloc] init];
        [testres request];
    }
    return 0;
}

