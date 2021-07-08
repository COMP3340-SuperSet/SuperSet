<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;

use App\Models\Set;
use App\Models\Item;
use App\Models\SetImage;
use App\Models\ItemImage;
use App\Models\User;

class Owner
{
    /**
     * The Guard implementation.
     * 
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     * 
     * @param Guard $auth
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        /**
         * Approve ALL Admin requests.
         */
        if (Auth::user()->role == 1) {
            return $next($request);
        }

        $method = $request->method();

        if ($method == 'GET') {
            // approving all GET requests
            return $next($request);
        } else if ($method == 'PUT' || $method == 'POST' || $method == 'DELETE') {

            $requestorid = Auth::user()->userid;
            $properties = $request->all();

            if (array_key_exists("userid", $properties)) {
                if ($request->userid != $requestorid) {
                    return response()->json(['error' => 'User does not have access to resource owned by ' . $request->userid], 401);
                }
            }

            if (array_key_exists("setid", $properties)) {
                $set = Set::find($request->setid);

                if (!$set) {
                    return response()->json(['error' => 'Set not found.'], 400);
                }
                $userid = $set->userid;
                if ($userid != $requestorid) {
                    return response()->json(['error' => 'User does not have authorization to edit the Set with setid ' . $request->setid], 401);
                }
            }

            if (array_key_exists("itemid", $properties)) {

                $item = Item::find($request->itemid);

                $obj = json_encode($item);

                if (!$item) {
                    return response()->json(['error' => 'Item not found.'], 400);
                }

                $setid = $item->setid;
                $set = Set::find($setid);
                if (!$set) {
                    return response()->json(['error' => "Set does not exist for item {$item->itemid}"], 400);
                }

                $userid = $set->userid;
                if ($userid != $requestorid) {
                    return response()->json(['error' => 'User does not have authorization to edit the Item with itemid ' . $request->itemid], 401);
                }
            }

            if (array_key_exists("imageid", $properties)) {

                //check all tables for userid w/ imageid
                $userid = User::where('imageid', '=', $request->imageid)->first()->userid;
                if (!$userid) {
                    $setid = SetImage::where('imageid', '=', $request->imageid)->first()->setid;
                    $set = Set::find($setid);
                    if (!$set) {
                        return response()->json(['error' => "Set does not exist for image {$request->imageid}"], 400);
                    }
                    $userid = $set->userid;
                }
                if (!$userid) {
                    $itemid = ItemImage::where('imageid', '=', $request->imageid)->first()->itemid;
                    $setid = Item::find($itemid)->setid;
                    $userid = Set::find($setid)->userid;
                }

                if (!$userid) {
                    return response()->json(['error' => 'Image not found.'], 400);
                }

                if ($userid != $requestorid) {
                    return response()->json(['error' => 'User does not have authorization to edit the Image with imageid ' . $request->imageid], 401);
                }
            }
            //success - no non-owned models
            return $next($request);
        }
    }
}
