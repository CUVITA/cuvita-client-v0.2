// pages/antisocial-main/antisocial-main.js
import palette from '../../config/palette.config';
import * as promisfy from '../../lib/wx.promisfy';
import * as localePackage from 'locale-package';

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
          { tag: 'van-field', name: 'openid', type: 'text', label: localePackage.form.openid.label[locale], placeholder: localePackage.form.openid.placeholder[locale], required: true },
          { tag: 'van-field', name: 'email', type: 'text', label: localePackage.form.email.label[locale], placeholder: localePackage.form.email.placeholder[locale], required: true , is: 'email'},
          { tag: 'van-field', name: 'lastname', type: 'text', label: localePackage.form.lastname.label[locale], placeholder: localePackage.form.lastname.placeholder[locale], required: true },
          { tag: 'van-field', name: 'firstname', type: 'text', label: localePackage.form.firstname.label[locale], placeholder: localePackage.form.firstname.placeholder[locale], required: true },
          { tag: 'van-field', name: 'tel', type: 'number', label: localePackage.form.tel.label[locale], placeholder: localePackage.form.tel.placeholder[locale], required: true },
        ]
      ]
    });
  },
  onSubmit: function ({ detail }) {
    wx.navigateTo({
      url: '/pages/antisocial-success/antisocial-success',
    })
    // wx.showLoading({ title: GlobalLocalePackage.loading[this.data.locale], mask: true });
    // promisfy.post('/member/register', { ...detail, openid: Store.getState().global.user.openid })
    //   .then(bundle => { 
    //     wx.hideLoading();
    //     this.setData({ bundle });
    //     this.proceed(1);
    //     return promisfy.requestPayment(bundle);
    //   })
    //   .then(() => {
    //     wx.showLoading({ title: localePackage.transaction.verifying[this.data.locale], mask: true });
    //     return new Promise((resolve) => { setTimeout(resolve, 3000) });
    //   })
    //   .then(() => {
    //     return promisfy.fetch(`/member/${Store.getState().global.user.openid}`)
    //   })
    //   .then(member => {
    //     wx.hideLoading();
    //     if (member) {
    //       this.proceed(2);
    //       Store.dispatch(GlobalActions.updateMember(member));
    //     } else {
    //       this.proceed(0);
    //       wx.showModal({
    //         title: localePackage.fail.modal.title[this.data.locale],
    //         content: localePackage.fail.modal.content[this.data.locale],
    //         showCancel: false,
    //         confirmColor: palette.primary
    //       });
    //     }
    //   })
    //   .catch(e => {
    //     this.proceed(0);
    //     e.errMsg ? wx.showToast({
    //       title: localePackage.fail.toast.payment[this.data.locale],
    //       icon: 'none'
    //     }) : wx.showToast({
    //       title: localePackage.fail.toast.unexpected[this.data.locale],
    //       icon: 'none'
    //     });
    //   });
  },
  
})