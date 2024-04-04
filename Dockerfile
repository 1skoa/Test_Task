# Используйте официальный образ PHP с Apache
FROM php:8.1-apache
# Установка драйвера для PostgreSQL
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Установите необходимые расширения PHP
RUN docker-php-ext-install pdo pdo_mysql
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN a2enmod rewrite
RUN service apache2 restart
# Установите Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Установите директорию приложения в контейнере
WORKDIR /var/www/html

# Копируйте файлы приложения в контейнер
COPY . /var/www/html
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
# Установите зависимости Composer
RUN composer install


# Откройте порт 80 в контейнере
EXPOSE 80

# Запустите Apache в фоновом режиме
CMD ["apache2-foreground"]
