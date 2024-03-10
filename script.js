
    if (window.location.hostname !== 'agungdevlop.github.io') {
        // Redirect ke URL yang diinginkan
        window.location.href = 'https://agungdevlop.github.io/chat.github.io/';
    }
    
        new Vue({
            el: '#app',
            data() {
                return {
                    searchInput: '',
                    notifications: [],
                    showNotifications: false,
                    loading: false
                };
            },
            methods: {
                async fetchNotifications() {
                    try {
                        const response = await fetch('https://doodskep.my.id/notifrequest.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-API-Key': 'AgungDev' // Ganti dengan kunci API yang sesuai
                            }
                        });
                        const data = await response.json();
                        this.notifications = data;
                    } catch (error) {
                        console.error('Error fetching notifications:', error);
                        this.notifications = [];
                    }
                },
                async searchNotifications() {
                    const searchValue = this.searchInput.trim().toLowerCase();

                    // Tampilkan loading spinner
                    this.loading = true;

                    // Ambil semua notifikasi dari API
                    await this.fetchNotifications();

                    // Filter notifikasi berdasarkan nomor telepon yang dicari
                    this.notifications = this.notifications.filter(notification => {
                        return notification.nohp.includes(searchValue);
                    });

                    // Sembunyikan loading spinner
                    this.loading = false;

                    // Tampilkan notifikasi setelah pencarian
                    this.showNotifications = true;
                },
                getNotificationClass(notification) {
                    switch (notification.notifications[0].App) {
                        case 'WhatsApp':
                            return 'whatsapp-bg';
                        case 'Messenger':
                            return 'messenger-bg';
                        case 'Telegram':
                            return 'telegram-bg';
                        case 'WhatsApp Business':
                            return 'whatsapp-business-bg';
                        default:
                            return '';
                    }
                },
                getAppIconClass(app) {
                    switch (app) {
                        case 'WhatsApp':
                            return 'fab fa-whatsapp';
                        case 'Messenger':
                            return 'fab fa-facebook-messenger';
                        case 'Telegram':
                            return 'fab fa-telegram';
                        case 'WhatsApp Business':
                            return 'fab fa-whatsapp';
                        default:
                            return '';
                    }
                },
                getTotalGroup(notifications) {
                    return notifications.filter(notif => notif.group).length;
                },
                getTotalSender(notifications) {
                    return notifications.filter(notif => notif.sender).length;
                },
                getTotalMessages(notifications) {
                    return notifications.length;
                }
            }
        });
        
    
