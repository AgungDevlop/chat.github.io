
        

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
                        this.notifications = data.map(item => {
                            return {
                                nohp: item.nohp,
                                notifications: item.notifications.reverse()
                            };
                        });
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
                formatTime(time) {
                    const [hourMinute, day, month, year] = time.split(',');
                    const [hour, minute] = hourMinute.split(':');
                    return `${hour}:${minute} ${day} ${this.getMonthName(parseInt(month))} ${year}`;
                },
                getMonthName(month) {
                    const months = [
                        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                    ];
                    return months[month - 1];
                }
            }
        });

    
