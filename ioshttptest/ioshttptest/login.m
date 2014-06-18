//
//  login.m
//  ioshttptest
//
//  Created by lishiming on 14-6-18.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//

#import "login.h"

@implementation login
-(void)request{
    NSString *strcontent = @"password=haining&email=yige2002@tom.com";
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",MAIN_SECOND_URL,@"book/login"];
    [self testPost:strcontent withURL:strhttp];
}
@end
