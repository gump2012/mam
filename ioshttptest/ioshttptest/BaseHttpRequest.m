//
//  BaseHttpRequest.m
//  ioshttptest
//
//  Created by lishiming on 14-5-15.
//  Copyright (c) 2014年 lishiming. All rights reserved.
//
//youjizz
//02kkk
//365.us.707
//55papa

#import "BaseHttpRequest.h"

@interface BaseHttpRequest ()

@end

@implementation BaseHttpRequest

- (id)init{
    self = [super init];
    if (self) {
        // Custom initialization
    }
    return self;
}

-(void)request{
    
}

-(void)testPost:(NSString *)content withURL:(NSString *)strurl
{
    NSURL *url = [NSURL URLWithString:strurl];
    //第二步，创建请求
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc]initWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:10];
    [request setHTTPMethod:@"POST"];//设置请求方式为POST，默认为GET
    NSData *data = [content dataUsingEncoding:NSUTF8StringEncoding];
    [request setHTTPBody:data];
    //第三步，连接服务器
    
    NSData *received = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    
    NSString *str1 = [[NSString alloc]initWithData:received encoding:NSUTF8StringEncoding];
    
    NSLog(@"%@",str1);
}

-(void)testGet:(NSString *)strurl
{
    NSURL *url = [NSURL URLWithString:strurl];
    //第二步，创建请求
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc]initWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:10];
    
    //第三步，连接服务器
    
    NSData *received = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    
    NSString *str1 = [[NSString alloc]initWithData:received encoding:NSUTF8StringEncoding];
    
    NSLog(@"%@",str1);
}

@end
