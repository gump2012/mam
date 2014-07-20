//
//  modifyinfo.m
//  ioshttptest
//
//  Created by gump on 7/20/14.
//  Copyright (c) 2014 gump. All rights reserved.
//

#import "modifyinfo.h"

@implementation modifyinfo
-(void)request{
    NSString *strcontent = @"uid=1f46c397c3c1b643f5cb4bc23b1cca5f&index=0\
&txt=dajiji&des_index=1";
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",LOCAL_URL,@"info/modifyInfo"];
    [self testPost:strcontent withURL:strhttp];
}
@end
