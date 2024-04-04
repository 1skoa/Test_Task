<?php

namespace App\Mail;

use Illuminate\Notifications\Messages\MailMessage;

class ProductMessage extends MailMessage
{
    public $productName;
    public $productUrl;

    public function productName($productName)
    {
        $this->productName = $productName;

        return $this;
    }

    public function productUrl($productUrl)
    {
        $this->productUrl = $productUrl;

        return $this;
    }
}
