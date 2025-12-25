document.addEventListener('DOMContentLoaded', function() {
    // Элементы страницы
    const toggleButton = document.getElementById('toggleButton');
    const statusIndicator = document.getElementById('statusIndicator');
    const ipAddressSpan = document.getElementById('ipAddress');
    const newIpSpan = document.getElementById('newIp');
    const newCountrySpan = document.getElementById('newCountry');
    const logList = document.getElementById('logList');
    const countryElements = document.querySelectorAll('.country');

    // Начальные переменные состояния
    let isVpnActive = false;
    let selectedCountry = null;
    let selectedIp = null;
    let selectedCountryName = null;

    // Функция для добавления записи в журнал
    function addLog(message) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {hour12: false});
        const logEntry = document.createElement('li');
        logEntry.textContent = `[${timeString}] ${message}`;
        logList.prepend(logEntry); // Добавляем в начало списка
        // Ограничиваем журнал 10 записями
        if (logList.children.length > 10) {
            logList.removeChild(logList.lastChild);
        }
    }

    // Функция для "включения" VPN
    function activateVpn() {
        if (!selectedCountry) {
            addLog("Ошибка: Сначала выберите страну!");
            alert("Пожалуйста, выберите страну для подключения!");
            return;
        }

        isVpnActive = true;
        // Меняем состояние кнопки и индикатора
        toggleButton.innerHTML = '<i class="fas fa-power-off"></i> ВЫКЛЮЧИТЬ VPN';
        toggleButton.className = 'btn-online';
        statusIndicator.innerHTML = '<div class="status-dot"></div><span>ОНЛАЙН</span>';
        statusIndicator.className = 'status-online';

        // "Меняем" IP и страну
        newIpSpan.textContent = selectedIp;
        newCountrySpan.textContent = selectedCountryName;
        ipAddressSpan.textContent = selectedIp; // "Подменяем" текущий IP

        addLog(`VPN АКТИВИРОВАН. Подключено к ${selectedCountryName} (IP: ${selectedIp})`);
        addLog("Защищённое соединение установлено (симулировано).");
    }

    // Функция для "выключения" VPN
    function deactivateVpn() {
        isVpnActive = false;
        // Возвращаем кнопку и индикатор в исходное состояние
        toggleButton.innerHTML = '<i class="fas fa-power-off"></i> ВКЛЮЧИТЬ VPN';
        toggleButton.className = 'btn-offline';
        statusIndicator.innerHTML = '<div class="status-dot"></div><span>ОФФЛАЙН</span>';
        statusIndicator.className = 'status-offline';

        // "Возвращаем" исходный IP
        ipAddressSpan.textContent = '192.168.1.1';
        newIpSpan.textContent = '---.---.---.---';
        newCountrySpan.textContent = 'Не выбрана';

        addLog(`VPN ОТКЛЮЧЕН. Возврат к локальному IP.`);
    }

    // Обработчик для кнопки ВКЛ/ВЫКЛ
    toggleButton.addEventListener('click', function() {
        if (isVpnActive) {
            deactivateVpn();
        } else {
            activateVpn();
        }
    });

    // Обработчики для выбора страны
    countryElements.forEach(country => {
        country.addEventListener('click', function() {
            // Снимаем выделение со всех стран
            countryElements.forEach(c => c.classList.remove('selected'));
            // Выделяем выбранную
            this.classList.add('selected');

            // Сохраняем выбранные данные
            selectedCountry = this;
            selectedIp = this.getAttribute('data-ip');
            selectedCountryName = this.getAttribute('data-country');

            addLog(`Выбрана страна: ${selectedCountryName}`);
            addLog(`Будет назначен IP: ${selectedIp}`);

            // Если VPN уже был активен, сразу "переподключаемся"
            if (isVpnActive) {
                addLog(`Переподключение к ${selectedCountryName}...`);
                // Небольшая задержка для эффекта
                setTimeout(() => {
                    ipAddressSpan.textContent = selectedIp;
                    newIpSpan.textContent = selectedIp;
                    newCountrySpan.textContent = selectedCountryName;
                    addLog(`Успешно переподключено к ${selectedCountryName}`);
                }, 300);
            }
        });
    });

    // Имитация начального лога
    setTimeout(() => addLog("Система FakeVPN инициализирована."), 500);
});
