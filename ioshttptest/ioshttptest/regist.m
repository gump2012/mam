//
//  regist.m
//  ioshttptest
//
//  Created by lishiming on 14-6-18.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//

#import "regist.h"

@implementation regist
-(void)request{
    NSString *strcontent = @"nickname=haining&password=haining&email=yige2002@tom.com";
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",LOCAL_URL,@"book/register"];
    [self testPost:strcontent withURL:strhttp];
}
@end
