<?php

namespace App\Notifications;

use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProductCreatedNotification extends Notification
{
    protected $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        Log::info('Sending email for product creation notification for product ID: ' . $notifiable->id);
        Log::info("NT : $notifiable");
        $productUrl = url('/products/' . $notifiable->id);
        return (new MailMessage)
            ->subject('Новый продукт был создан')
            ->line('Новый продукт был успешно создан!')
            ->line("Название продукта: {$this->product->name}")
            ->line("Артикул: {$this->product->article}");
    }
}
