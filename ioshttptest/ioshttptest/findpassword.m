//
//  findpassword.m
//  ioshttptest
//
//  Created by lishiming on 14-6-18.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//

#import "findpassword.h"

@implementation findpassword
-(void)request{
    NSString *strcontent = @"email=yige2002@tom.com";
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",MAIN_SECOND_URL,@"book/findpassword"];
    [self testPost:strcontent withURL:strhttp];
}
@end
