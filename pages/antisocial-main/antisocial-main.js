// pages/antisocial-main/antisocial-main.js
import palette from '../../config/palette.config';
import * as promisfy from '../../lib/wx.promisfy';
import * as localePackage from 'locale-package';
import src from '../../config/antisocial.config';

const { Store, GlobalActions, GlobalLocalePackage } = getApp();

Page({
  data: {
    localePackage, 
    palette,
    src
  },
  onLoad:function(){
    let { locale } = Store.getState().global;
    wx.setNavigationBarTitle({
      title: localePackage.title[Store.getState().global.locale]
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
  goToRegisterPage:function(param){
    wx.navigateTo({
      url: '/pages/antisocial-register/antisocial-register',
    })
  }
})