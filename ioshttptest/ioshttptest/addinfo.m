//
//  addinfo.m
//  ioshttptest
//
//  Created by lishiming on 14-7-15.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//

#import "addinfo.h"

@implementation addinfo
-(void)request{
    NSString *strcontent = @"uid=6acd6923ae5b2dbf8f3df029dd1ddf46&type=0&info_type=1&txt=我很喜欢";
    NSData *smalldata = [NSData dataWithContentsOfFile:@"/Users/lishiming/Desktop/androiddesign.jpg"];
    NSString *strsmalldata = [[NSString alloc] initWithData:smalldata encoding:NSUTF8StringEncoding];
    NSString *smallstr = [NSString stringWithFormat:@"&img_small=[\".jpg\",\"%@\"]",strsmalldata];
    NSData *bigdata = [NSData dataWithContentsOfFile:@"/Users/lishiming/Desktop/set3.jpg"];
    NSString *strbigdata = [[NSString alloc] initWithData:bigdata encoding:NSUTF8StringEncoding];
    NSString *bigstr = [NSString stringWithFormat:@"&img_big=[\".jpg\",\"%@\"]",strbigdata];
    NSString *strpost = [NSString stringWithFormat:@"%@%@%@",strcontent,smallstr,bigstr];
    NSString *strhttp = [NSString stringWithFormat:@"%@%@",MAIN_SECOND_URL,@"info/addinfo"];
    [self testPost:strpost withURL:strhttp];
}
@end
