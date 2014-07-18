//
//  getinfolist.m
//  ioshttptest
//
//  Created by lishiming on 14-7-18.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//

#import "getinfolist.h"

@implementation getinfolist
-(void)request{
    NSString *strcontent = @"uid=b8c0b233e971576395878287d48c856e&type=0";
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",MAIN_SECOND_URL,@"info/getinfolist"];
    [self testPost:strcontent withURL:strhttp];
}
@end
