//
//  deleteinfo.m
//  ioshttptest
//
//  Created by lishiming on 14-7-18.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//

#import "deleteinfo.h"

@implementation deleteinfo
-(void)request{
    NSString *strcontent = @"uid=b8c0b233e971576395878287d48c856e&index=1";
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",LOCAL_URL,@"info/deleteInfo"];
    [self testPost:strcontent withURL:strhttp];
}
@end
