<?php

namespace App\Jobs;

use App\Models\Product;
use App\Notifications\ProductCreatedNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendProductCreatedNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $product;
    /**
     * Create a new job instance.
     */
    public function __construct(Product $product)
    {
        Log::info("PR : $product");
       $this->product = $product;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        Log::info('Sending product created notification for product ID: ' . $this->product->id);

        $this->product->notify(new ProductCreatedNotification($this->product));
    }
}
