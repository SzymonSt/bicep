﻿// WVD Host Pool
resource /*${1:hostPool}*/hostPool 'Microsoft.DesktopVirtualization/hostpools@2019-12-10-preview' = {
  name: /*${2:'name'}*/'name'
  location: /*${3:location}*/'location'
  properties: {
    friendlyName: /*${4:'hostpoolFriendlyName'}*/'hostpoolFriendlyName'
    hostPoolType: /*${5|'Personal','Pooled'|}*/'Personal'
    loadBalancerType: /*${6|'BreadthFirst','DepthFirst','Persistent'|}*/'BreadthFirst'
    preferredAppGroupType: /*${7|'Desktop','RailApplications','None'|}*/'Desktop'
  }
}
