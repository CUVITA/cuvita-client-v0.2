// pages/antisocial-main/antisocial-main.js
import palette from '../../config/palette.config';
import * as promisfy from '../../lib/wx.promisfy';
import * as localePackage from 'locale-package';
import autofiller from '../../utils/form-autofiller';


const { Store, GlobalActions, GlobalLocalePackage } = getApp();
const minimumAge = 16;

Page({ 
  data: {
    localePackage, 
    palette,
  },
  onLoad:function(){
    let { locale } = Store.getState().global;
    wx.setNavigationBarTitle({
      title: localePackage.title[Store.getState().global.locale]
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    });
    this.setData({
      locale,
      fields: [
        [
          { tag: 'van-field', name: 'openid', type: 'text', label: localePackage.form.openid.label[locale], placeholder: localePackage.form.openid.placeholder[locale], icon: localePackage.form.openid.icon[locale], required: true },
          { tag: 'van-field', name: 'email', type: 'text', label: localePackage.form.email.label[locale], placeholder: localePackage.form.email.placeholder[locale], required: true , is: 'email'},
          { tag: 'van-field', name: 'name', type: 'text', label: localePackage.form.name.label[locale], placeholder: localePackage.form.name.placeholder[locale], required: true },
          { tag: 'van-field', name: 'tel', type: 'number', label: localePackage.form.tel.label[locale], placeholder: localePackage.form.tel.placeholder[locale], required: true },
        ]
      ]
    });
    wx.showLoading({
      title: GlobalLocalePackage.loading[locale],
      mask: true
    });
    Promise.all([
      promisfy.fetch(`/member/${ Store.getState().global.user.openid }`),
      promisfy.fetch(`/antisocial/member_info?openid=${ Store.getState().global.user.openid }`)
    ])
      .then(res => {
        let member = res[0];
        let is_member = res[1].is_member;
        let fill = autofiller(['email', 'name', 'tel'], member);
        this.setData({
          ['fields[0][1].value']: fill.email,
          ['fields[0][2].value']: fill.name,
          ['fields[0][3].value']: fill.tel,
        });
        if (is_member){
          this.setData({
            ['fields[0][0].value']: Store.getState().global.user.openid,
          })
        }
      });
    wx.hideLoading();
  },
  onSubmit: function ({ detail }) {
    wx.showLoading({ title: GlobalLocalePackage.loading[this.data.locale] });
    promisfy.post('/antisocial/apply', { ...detail })
      .then(data => {
        var applied = data.applied;
        if (applied){
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/antisocial-fail/antisocial-fail'
          });
        }
        else {
          var applyResult = JSON.stringify(data);
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/antisocial-success/antisocial-success?applyResult=' + applyResult,
          });
        }
      });
  },
})